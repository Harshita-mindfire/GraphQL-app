import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_BOOKS = gql`
  query getAllBooks {
    books {
      name
      id
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;

