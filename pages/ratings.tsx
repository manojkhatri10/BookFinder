import { useState, useEffect, useCallback } from "react";

// Debounce function to delay the API request
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

const Ratings = () => {
  const [books, setBooks] = useState<any[]>([]); // For storing book data with ratings
  const [loading, setLoading] = useState<boolean>(false); // Handle loading state
  const [query, setQuery] = useState<string>(""); // State to store search query
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false); // Track if search was performed

  // Use the debounced search query
  const debouncedQuery = useDebounce(query, 500); // 500ms delay for debouncing

  // Fetch books with ratings from the Google Books API
  useEffect(() => {
    const fetchTopRatedBooks = async () => {
      if (!debouncedQuery.trim()) {
        // If the query is empty, don't make the request
        setBooks([]);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${debouncedQuery}&orderBy=relevance&maxResults=10`
        );

        const data = await response.json();
        console.log(data); // Check what data is returned by the API

        if (data.items) {
          // Filter books with a rating
          const booksWithRatings = data.items.map((item: any) => {
            return {
              title: item.volumeInfo.title,
              author: item.volumeInfo.authors?.join(", "),
              genre: item.volumeInfo.categories?.join(", "),
              rating: item.volumeInfo.averageRating || "Not Rated",
              image: item.volumeInfo.imageLinks?.thumbnail,
            };
          });

          setBooks(booksWithRatings);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
        setSearchPerformed(true); // Mark that search was performed
      }
    };

    // Fetch books only when debouncedQuery changes
    if (debouncedQuery) {
      fetchTopRatedBooks();
    }
  }, [debouncedQuery]); // Trigger fetch when the debounced query changes

  // Handle the search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Top Rated Books</h1>

      {/* Search input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={handleSearchChange}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : books.length > 0 ? (
        <div>
          {books.map((book, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {book.image && (
                  <img
                    src={book.image}
                    alt={book.title}
                    style={{
                      width: "80px",
                      height: "120px",
                      marginRight: "20px",
                    }}
                  />
                )}
                <div>
                  <h3>{book.title}</h3>
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p>
                    <strong>Rating:</strong> {book.rating}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        searchPerformed && <p>No books found. Try another search.</p>
      )}
    </div>
  );
};

export default Ratings;
