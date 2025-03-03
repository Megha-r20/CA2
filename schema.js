const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    gener: {type: String, required: true},
    publishedYear: { type: Number, required: true },
    availableCopies: { type: Number, required: true },
    borrowedBy: {type: ArrayofObjecctlds, referencesUser: true },
});

module.exports = mongoose.model('Book', BookSchema);