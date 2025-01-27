import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.get('/current-user', async (req, res) => {
  try {
    // Fetch the current user from the external API
    interface ApiResponse {
      currentUser: any;
    }

    const response = await axios.get<ApiResponse>(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/auth/session',
      {
        headers: {
          // Hardcoded cookie value
          Cookie: `session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkzT0Rrd1pHUXlOVE01TVRNNU1EQXhPVEkxTm1abU15SXNJbVZ0WVdsc0lqb2libWw0YjI1aGFXd3VZMjl0SWl3aWFXRjBJam94TnpNM09UQXhOVFkzZlEuSG9qeFIxM0t4VE1wY2pVWEtjb1g5OUZFVnU1MWtENV82SXNDTU90VkVNVSJ9`,
        },
      }
    );

    const currentUser = response.data.currentUser || null;

    // Log the user to the terminal
    console.log('Fetched Current User:', currentUser);

    // Return the user in the response
    res.json({ currentUser });
  } catch (error: any) {
    console.error('Error fetching current user:', error.message);
    res.status(500).json({ error: 'Failed to fetch current user' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
