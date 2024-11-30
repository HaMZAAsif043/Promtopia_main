"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const Page = () => {
    const { data: session, status } = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirm = confirm("Are you sure you want to delete this prompt ?")
        if (hasConfirm) {
            try {
                const res = await fetch(`/api/prompt/${post._id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (res.ok) {
                    router.push("/")
                }
            } catch (error) {
                console.log("Error", error)
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (session?.user?.id) {
                try {
                    const response = await fetch(`/api/users/${session.user.id}/posts`);
                    const data = await response.json();
                    console.log('Data:', data);
                    if (response.ok) {
                        setPosts(data);
                    } else {
                        console.error('Error fetching posts:', data.message);
                    }
                } catch (error) {
                    console.error('Error during fetch:', error);
                }
            }
        };
        fetchData();
    }, [session]);

    // Handle loading state
    if (status === 'loading') {
        return <div>Loading...</div>; // Loading state while session is being fetched
    }

    // Handle unauthenticated state
    if (status === 'unauthenticated') {
        return <div>Please log in to view your profile.</div>; // If user is not authenticated
    }

    return (
        <Profile
            name="My Profile"
            desc="Welcome to your personalized profile"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default Page;
