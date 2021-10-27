const deleteButton = document.querySelector('#delete-post-button');

const deleteBlogPost = async () => {
  
  console.log("you've clicked delete")
  const id = document.querySelector('.blog-num').innerHTML;

  if (id) {
    const response = await fetch(`/blogpage/delete/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (response.ok) {

      document.location.replace('/');
    } else {
      alert('Failed to post blog');
    }
  }
}

deleteButton.addEventListener("click", deleteBlogPost);
