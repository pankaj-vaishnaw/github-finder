const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('search');
const profile = document.getElementById('profile');

searchBtn.addEventListener('click', () => {
    const username = searchInput.value.trim();

    if (username !== '') {
        fetch(`https://api.github.com/users/${username}`)
            .then((response) => {
                console.log(response)
                if (response.status === 404) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then((data) => {
                const { login, name,html_url, avatar_url, bio, public_repos, followers, following, location } = data;
                profile.innerHTML = `
                    <div class="user-profile">
                        <img src="${avatar_url}" alt="${login}" class="avatar">
                        
                        <h2>${name || login}</h2>
                        <a href=${html_url}>link to github</a>
                        <p>${bio || 'No bio available'}</p>
                        <div class="follow-list">
                        
                            <p>Repos: ${public_repos}</p>
                            <p>Followers: ${followers}</p>
                            <p>Following: ${following}</p>
                            <p>Location: ${location}</p>
                        
                        </div>
                    </div>
                `;
            })
            .catch((error) => {
                profile.innerHTML = `<p>${error.message}</p>`;
            });
    }
});
