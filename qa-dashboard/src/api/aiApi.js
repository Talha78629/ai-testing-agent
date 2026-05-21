import axios from 'axios'

const API =
  'http://localhost:5000/api/ai'

export async function getRCA(error) {

  const response =
    await axios.post(

      `${API}/rca`,

      {
        error
      }

    )

  return response.data

}