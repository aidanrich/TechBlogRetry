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

const updateButton = document.querySelector('#update-post-button')

const updateBlogPost = async () => {

  const id = document.querySelector('.blog-num').innerHTML;
  const name = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  if (id && name && content) {
    const response = await fetch(`/blogpage/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id, name, content
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (response.ok) {
      document.location.replace(`/blogpage/${id}`);
    } else {
      alert('Failed to edit activity');
    }

  }

}

updateButton.addEventListener("click", updateBlogPost);
