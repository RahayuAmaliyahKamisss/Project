// // controllers/chatbotController.js

// const natural = require("natural");
// const { KnowledgeBase } = require("../models/indexModels");
// const preprocessText = require("../services/preprocessingService");

// exports.askChatbot = async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({
//         success: false,
//         message: "Message wajib diisi",
//       });
//     }

//     // preprocessing input user
//     const userQuestion = preprocessText(message);

//     // ambil semua knowledge base
//     const knowledgeData = await KnowledgeBase.findAll();

//     if (!knowledgeData.length) {
//       return res.status(404).json({
//         success: false,
//         message: "Knowledge base kosong",
//       });
//     }

//     // siapkan semua dokumen pertanyaan
//     const documents = knowledgeData.map((item) =>
//       preprocessText(item.question)
//     );

//     // tambah pertanyaan user sebagai query terakhir
//     const allDocuments = [...documents, userQuestion];

//     // TF-IDF
//     const tfidf = new natural.TfIdf();

//     allDocuments.forEach((doc) => {
//       tfidf.addDocument(doc);
//     });

//     let highestScore = 0;
//     let bestMatchIndex = -1;

//     // bandingkan query user dengan semua pertanyaan database
//     documents.forEach((doc, index) => {
//       let score = 0;

//       userQuestion.split(" ").forEach((term) => {
//         score += tfidf.tfidf(term, index);
//       });

//       if (score > highestScore) {
//         highestScore = score;
//         bestMatchIndex = index;
//       }
//     });

//     // threshold minimal similarity
//     if (highestScore < 1) {
//       return res.status(200).json({
//         success: true,
//         answer: "Maaf, informasi belum tersedia.",
//         score: highestScore,
//       });
//     }

//     const bestAnswer = knowledgeData[bestMatchIndex];

//     res.status(200).json({
//       success: true,
//       question: message,
//       matched_question: bestAnswer.question,
//       answer: bestAnswer.answer,
//       score: highestScore,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Terjadi kesalahan pada chatbot",
//       error: error.message,
//     });
//   }
// };

const natural = require("natural");
const { KnowledgeBase } = require("../models/indexModels");
const preprocessText = require("../services/preprocessingService");

// =====================================================
// FUNGSI COSINE SIMILARITY
// Menghitung tingkat kemiripan antara dua vektor TF-IDF
//
// Rumus:
// Cosine Similarity =
// (A · B) / (|A| × |B|)
//
// Nilai:
// 0   = tidak mirip
// 1   = identik
// =====================================================
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    // Perkalian antar elemen vektor
    dotProduct += vecA[i] * vecB[i];

    // Panjang vektor A
    normA += vecA[i] * vecA[i];

    // Panjang vektor B
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

exports.askChatbot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message wajib diisi",
      });
    }

    // =====================================================
    // NLP PREPROCESSING
    // Tahapan:
    // 1. Case Folding
    // 2. Tokenizing
    // 3. Stopword Removal
    // 4. Stemming
    //
    // Tujuan:
    // Membersihkan teks agar siap diproses TF-IDF
    // =====================================================
    const userQuestion = preprocessText(message);

    // Ambil seluruh data knowledge base
    const knowledgeData = await KnowledgeBase.findAll();

    if (!knowledgeData.length) {
      return res.status(404).json({
        success: false,
        message: "Knowledge base kosong",
      });
    }

    // =====================================================
    // PREPROCESSING DOKUMEN KNOWLEDGE BASE
    // Setiap pertanyaan pada database diproses NLP
    // =====================================================
    const documents = knowledgeData.map((item) =>
      preprocessText(item.question)
    );

    // =====================================================
    // QUERY USER DITAMBAHKAN KE KUMPULAN DOKUMEN
    // Agar TF-IDF dapat menghitung bobot query dan dokumen
    // dalam satu ruang vektor yang sama
    // =====================================================
    const allDocuments = [...documents, userQuestion];

    // =====================================================
    // PEMBOBOTAN TF-IDF
    //
    // TF (Term Frequency)
    // Menghitung frekuensi kemunculan kata
    //
    // IDF (Inverse Document Frequency)
    // Mengukur tingkat pentingnya kata
    //
    // TF-IDF = TF × IDF
    // =====================================================
    const tfidf = new natural.TfIdf();

    allDocuments.forEach((doc) => {
      tfidf.addDocument(doc);
    });

    // =====================================================
    // MEMBANGUN VOCABULARY
    //
    // Mengumpulkan seluruh kata unik dari:
    // - Dokumen database
    // - Query pengguna
    //
    // Vocabulary digunakan sebagai dimensi vektor
    // =====================================================
    const vocabulary = new Set();

    allDocuments.forEach((doc) => {
      doc.split(" ").forEach((term) => {
        vocabulary.add(term);
      });
    });

    const terms = [...vocabulary];

    // =====================================================
    // MEMBENTUK VEKTOR QUERY USER
    //
    // Setiap term pada vocabulary diberikan bobot TF-IDF
    //
    // Contoh:
    // [0.45, 0.22, 0, 0.11, ...]
    // =====================================================
    const queryVector = terms.map((term) =>
      tfidf.tfidf(term, documents.length)
    );

    let highestScore = 0;
    let bestMatchIndex = -1;

    // =====================================================
    // PERHITUNGAN COSINE SIMILARITY
    //
    // Langkah:
    // 1. Bentuk vektor TF-IDF setiap dokumen
    // 2. Hitung kemiripan dokumen dengan query
    // 3. Cari nilai similarity tertinggi
    //
    // Output:
    // score = 0 sampai 1
    // =====================================================
    documents.forEach((doc, index) => {

      // Vektor TF-IDF dokumen
      const documentVector = terms.map((term) =>
        tfidf.tfidf(term, index)
      );

      // =================================================
      // PERHITUNGAN COSINE SIMILARITY
      //
      // score =
      // cosineSimilarity(queryVector, documentVector)
      //
      // Semakin mendekati 1,
      // semakin mirip dokumen dengan query user
      // =================================================
      const score = cosineSimilarity(
        queryVector,
        documentVector
      );

      // Simpan dokumen dengan similarity tertinggi
      if (score > highestScore) {
        highestScore = score;
        bestMatchIndex = index;
      }
    });

    // =====================================================
    // THRESHOLD
    //
    // Jika similarity < 0.2
    // maka dianggap tidak relevan
    // =====================================================
    if (highestScore < 0.2) {
      return res.status(200).json({
        success: true,
        question: message,
        answer: "Maaf, informasi belum tersedia.",
        score: highestScore,
      });
    }

    const bestAnswer = knowledgeData[bestMatchIndex];

    // =====================================================
    // HASIL AKHIR
    //
    // Menampilkan jawaban dengan
    // nilai similarity tertinggi
    // =====================================================
    res.status(200).json({
      success: true,
      question: message,
      matched_question: bestAnswer.question,
      answer: bestAnswer.answer,
      score: highestScore,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada chatbot",
      error: error.message,
    });
  }
};