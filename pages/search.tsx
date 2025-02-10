import { useState, useEffect } from "react";

// Debounce hook to delay the API request
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Debounced search query
  const debouncedQuery = useDebounce(query, 500); // 500ms delay

  // Fetch books from the API whenever debouncedQuery changes
  useEffect(() => {
    const searchBooks = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setSearchPerformed(true); // Mark that search was performed

      try {
        const response = await fetch(`/api/books?query=${debouncedQuery}`);
        const data = await response.json();

        // Log the API response to debug
        console.log("API response data:", data);

        // Assuming the API returns a list of books
        setResults(data.items || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedQuery) {
      searchBooks();
    }
  }, [debouncedQuery]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Search for Books</h1>
      <input
        type="text"
        placeholder="Search by title, author, or genre"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <div style={{ marginTop: "20px" }}>
        {loading && <p>Loading...</p>}

        {!loading && searchPerformed && results.length === 0 && (
          <p>No books found. Try another search.</p>
        )}

        {/* Display books after fetching */}
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {results.map((book, index) => {
            // Extract image URL from API response
            const imageUrl =
              book.volumeInfo?.imageLinks?.thumbnail ||
              "https://via.placeholder.com/150"; // Fallback to a placeholder image

            return (
              <div key={index} style={{ margin: "10px", width: "200px" }}>
                {/* Display the image or a placeholder */}
                <img
                  src={imageUrl}
                  alt={book.volumeInfo?.title}
                  style={{ width: "100%", height: "auto" }}
                />
                <h3>{book.volumeInfo?.title}</h3>
                <p>Author: {book.volumeInfo?.authors?.join(", ")}</p>
                <p>Genre: {book.volumeInfo?.categories?.join(", ")}</p>
                <p>Rating: {book.volumeInfo?.averageRating || "Not Rated"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
