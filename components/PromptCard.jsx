"use client"
import Image from 'next/image'
import React from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copy, setCopy] = React.useState("")
  const pathname = usePathname()
  const { session } = useSession()
  const { push } = useRouter()
  const handleCopy = () => {
    setCopy(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => {
      setCopy("")
    }, 3000)
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex items-center gap-5'>
          <Image
            src={post.creator.image}
            alt='creator'
            width={40}
            height={40}
            className='rounded-full'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post?.creator?.username}
            </h3>
            <p className=' font-intern text-sm text-gray-500'>{post?.creator?.email}</p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copy === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            width={12}
            height={12}
            alt="Description of the image" />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>
      {session?.user.id === post?.creator?.id && pathname === "/profile" && (
        <div className='flex justify-end gap-5'>
          <p className='font-intern text-sm green_gradient cursor-pointer' onClick={handleEdit}>Edit</p>
          <p className='font-intern text-sm orange_gradient cursor-pointer' onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
