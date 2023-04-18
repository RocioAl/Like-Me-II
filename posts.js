const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'likeme',
    allowExitOnIdle: true
})

const createPost = async (titulo, img, descripcion, likes = 0) => {
    const query = 'INSERT INTO posts VALUES(DEFAULT, $1, $2, $3, $4)'
    const values = [titulo, img, descripcion, likes]
    await pool.query(query, values)
    console.log('Se agregó un post')
}

const getAllPosts = async () => {
    const query = 'SELECT * FROM posts'
    const { rows } = await pool.query(query)
    return rows
}
const updatePost = async (id) => {
    const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1"
    const values = [id]
    await pool.query(query, values)
}


const deletePost = async (id) => {
    try {
        const query = "DELETE FROM posts WHERE id = $1"
        const values = [id]
        await pool.query(query, values)
    }
    catch (error) {
        res.status(500).send('Ocurrió un error...')
    }
}
module.exports = { createPost, getAllPosts, updatePost, deletePost }