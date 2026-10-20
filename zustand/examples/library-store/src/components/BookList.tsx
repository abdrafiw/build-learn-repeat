import useLibraryStore from "../store/useLibraryStore";

import BookItem from "./Book";

function BookList() {
  const books = useLibraryStore((state) => state.books);
  const noOfIssued = useLibraryStore((state) => state.noOfIssued);
  const noOfAvailable = useLibraryStore((state) => state.noOfAvailable);

  return (
    <div className="container book-list-container">
      <header className="book-list-container_header">
        <p className="">
          Available:
          <span className="count">{noOfAvailable}</span>
        </p>

        <p className="">
          Issued:
          <span className="count">{noOfIssued}</span>
        </p>
      </header>

      <ul className="book-list">
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </ul>
    </div>
  );
}

export default BookList;
