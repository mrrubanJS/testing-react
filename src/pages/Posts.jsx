import React, { useEffect, useMemo, useRef, useState } from "react"
// import ClassCounter from "./components/ClassCounter"
// import Counter from "./components/Counter"
import PostFilter from "../components/PostFilter"
import PostForm from "../components/PostForm"
// import PostItem from "./components/PostItem"
import PostList from "../components/PostList"
import MyButton from "../components/UI/button/MyButton"
// import MyInput from "./components/UI/input/MyInput"
import MyModal from "../components/UI/MyModal/MyModal"
import { usePosts } from "../hooks/usePosts"
// import MySelect from "./components/UI/MySelect/MySelect"
import "../styles/App.css"

import PostService from "../API/PostService"
import Loader from "../components/UI/Loader/Loader"
import { useFetching } from "../hooks/useFetching"
import { getPageCount, getPagesArray } from "../components/utils/pages"
import Pagination from "../components/UI/pagination/pagination"

function Posts() {
  const [posts, setPosts] = useState([])

  const [filter, setFilter] = useState({ sort: "", query: "" })

  const [modal, setModal] = useState(false)

  const [totalPages, setTotalPages] = useState(0)

  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

 

  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page)=>{

    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))

  })


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  useEffect(() => {
    fetchPosts(limit, page)
  }, [])



  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const changePage = (page)=>{
    setPage(page)
    fetchPosts(limit, page)

  }

  return (
    <div className="App">
      <MyButton
        style={{ marginTop: "30px" }}
        onClick={() => setModal(true)}>
        создать пользователя
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError&& 
      <h1>произошла ошибка {postError}</h1>}
      {isPostsLoading ? 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
          <Loader/>
          </div> 
       : 
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="List 1"
        />
      }
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
     
    </div>
  )
}

export default Posts
