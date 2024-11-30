import React from 'react';
import PromptCard from './PromptCard';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.length > 0 ? (
          data.map((post) => (
            <PromptCard
              key={post.id} // Use post.id as the key for better performance
              post={post}
              handleEdit={() => handleEdit(post)} // Pass the post to handleEdit
              handleDelete={() => handleDelete(post)} // Pass the post to handleDelete
            />
          ))
        ) : (
          <p>No posts available</p> // Handle case when no posts exist
        )}
      </div>
    </section>
  );
};

export default Profile;
