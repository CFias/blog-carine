export const PostCard = ({ imageUrl, caption }) => {
    return (
      <div className="post-card">
        <p className="post-caption">{caption}</p>
        <img src={imageUrl} alt="Publicação" className="post-image" />
      </div>
    );
  };