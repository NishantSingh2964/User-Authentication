import React from "react";

const BlogContent = ({ content }) => {
  return (
    <section className="w-full px-4 bg-white py-20">

      {/* FULL WIDTH WRAPPER */}
      <div className="w-full px-6 md:px-16 lg:px-32">

        <article
          className="
            prose 
            prose-lg 
            md:prose-xl 
            max-w-none
            prose-headings:text-gray-900
            prose-headings:font-bold
            prose-p:text-gray-700
            prose-p:leading-relaxed
            prose-a:text-blue-600
            prose-a:no-underline
            hover:prose-a:underline
            prose-img:rounded-2xl
            prose-img:shadow-lg
            prose-img:mx-auto
            prose-blockquote:border-l-4
            prose-blockquote:border-blue-500
            prose-blockquote:bg-blue-50
            prose-blockquote:p-6
            prose-blockquote:rounded-lg
            prose-strong:text-gray-900
            prose-ul:list-disc
            prose-ol:list-decimal
          "
          dangerouslySetInnerHTML={{ __html: content }}
        />

      </div>

    </section>
  );
};

export default BlogContent;