// PostPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = doc(db, "posts", id);
        const postSnapshot = await getDoc(postDoc);
        if (postSnapshot.exists()) {
          const data = postSnapshot.data();
          setPost({
            id: postSnapshot.id,
            ...data,
            publishedAt: data.publishedAt.toDate(),
          });
        } else {
          console.log("Post não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!post) {
    return <div>Post não encontrado</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.caption}</p>
      {post.image && <img src={post.image} alt="Publicação" />}
      <p>
        Publicado em: {format(post.publishedAt, "MMM yyyy", { locale: ptBR })}
      </p>
    </div>
  );
}

export default PostPage;
