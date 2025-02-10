// pages/api/books.ts

import type { NextApiRequest, NextApiResponse } from 'next'

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=${query}`);
    const data = await response.json();

    // Return the books from the API response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from Google Books API", error);
    res.status(500).json({ error: 'Error fetching data from Google Books API' });
  }
}
