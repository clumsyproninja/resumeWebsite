const username = 'clumsyproninja'
const apiUrl = `https://api.github.com/users/${username}/repos`

async function fetchRepos(){
    try{
        const response = await fetch(apiUrl)
        const repos = await response.json()

        const reposList = document.getElementById('repos')

        repos.forEach(repo => {
            const li = document.createElement('li')
            const link = document.createElement('a')
            const arrow = document.createTextNode(' → ')
            const lastUpdate = new Date(repo.updated_at).toLocaleDateString()
            
            link.href = repo.html_url
            link.target = '_blank'
            link.textContent = repo.name

            li.appendChild(link)
            li.appendChild(arrow)
            li.appendChild(document.createTextNode(`Last Update: ${lastUpdate}`))
            
            reposList.appendChild(li)
        })
    } catch (error){
        console.error('Error fetching repositories:', error)
    }
}

fetchRepos()