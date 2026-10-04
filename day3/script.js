let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" }
];

// 1. Search notes
function searchNotes(word) {
  const searchWord = word.toLowerCase();

  return notes.filter(note =>
    note.text.toLowerCase().includes(searchWord)
  );
}

// Normal case
console.log(searchNotes("JavaScript"));
// Expected: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

// Edge case: no matching notes
console.log(searchNotes("Python"));
// Expected: []


// 2. Find the longest note
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];

  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }

  return longest;
}

// Normal case
console.log(longestNote());
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

// Edge case: temporarily testing an empty array
const savedNotes = notes;
notes = [];
console.log(longestNote());
// Expected: null
notes = savedNotes;


// 3. Count notes by category
function countByCategory() {
  const counts = {};

  for (const note of notes) {
    if (!counts[note.category]) {
      counts[note.category] = 0;
    }

    counts[note.category]++;
  }

  return counts;
}

// Normal case
console.log(countByCategory());
// Expected: { personal: 2, study: 2, work: 1 }

// Edge case: empty notes array
notes = [];
console.log(countByCategory());
// Expected: {}
notes = savedNotes;


// 4. Get notes summary
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const noteWord = total === 1 ? "note" : "notes";

  return `${total} ${noteWord}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}

// Normal case
console.log(getSummary());
// Expected: 5 notes: 2 personal, 1 work, 2 study.

// Edge case: one note
notes = [
  { id: 1, text: "Call mum", category: "personal" }
];
console.log(getSummary());
// Expected: 1 note: 1 personal, 0 work, 0 study.
notes = savedNotes;


// 5. Check for duplicate notes
function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();

  return notes.some(note =>
    note.text.trim().toLowerCase() === normalizedText
  );
}

// Normal case
console.log(isDuplicate("  CALL MUM  "));
// Expected: true

// Edge case: text does not exist
console.log(isDuplicate("Go shopping"));
// Expected: false


// 6. Add a new note
function addNote(text, category) {
  const trimmedText = text.trim();
  const validCategories = ["personal", "work", "study"];

  if (trimmedText.length < 1 || trimmedText.length > 200) {
    console.log("Note must be between 1 and 200 characters.");
    return false;
  }

  if (!validCategories.includes(category)) {
    console.log("Invalid category. Use personal, work, or study.");
    return false;
  }

  if (isDuplicate(trimmedText)) {
    console.log("Duplicate note. Note was not added.");
    return false;
  }

  const newId = notes.length > 0
    ? Math.max(...notes.map(note => note.id)) + 1
    : 1;

  notes.push({
    id: newId,
    text: trimmedText,
    category: category
  });

  return true;
}

// Normal case
console.log(addNote("Buy a new notebook", "personal"));
// Expected: true

// Edge case: duplicate note
console.log(addNote("  CALL MUM  ", "personal"));
// Expected: false

