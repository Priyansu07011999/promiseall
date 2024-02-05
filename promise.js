const posts = [];
let lastUserActivityTime = null;

function createPost(post) {
    return new Promise((resolve, reject) => {
        const preCreationTimestamp = new Date();
        setTimeout(() => {
            const postCreationTimestamp = new Date().getTime();
            posts.push({ ...post, timestamp: postCreationTimestamp });
            resolve(posts);
        }, 1000);
    });
}

function updateLastUserActivityTime() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            lastUserActivityTime = new Date();
            resolve(lastUserActivityTime);
        }, 1000);
    });
}

function deletePost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (posts.length > 0) {
                const deletedPost = posts.pop();
                resolve(deletedPost);
            } else {
                reject('No posts to delete');
            }
        }, 1000);
    });
}

// Example usage with Promise.all
Promise.all([
    updateLastUserActivityTime(),
    createPost({ title: 'Post 1', content: 'Content of Post 1' })
])
    .then(([preCreationTimestamp, postsResult]) => {
        const createdPost = postsResult[0];
        console.log(`Before creating post the userlastactivitytime is ${preCreationTimestamp}`);
        console.log(`After creating posts >>>>>> `)
        console.log('Post-Creation Timestamp:', createdPost.timestamp);
        return deletePost();
    })
    .then((deletedPost) => {
        console.log('Deleted Post:', deletedPost);
        console.log('Remaining Posts:', posts);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
