// Variables for ease of access
const username = 'clumsyproninja'
const githubAPI = `https://api.github.com/users/${username}/repos`

// Handle button
document.getElementById('refresh').addEventListener('click', fetchRepos)

// Function to fetch and display github repositories
async function fetchRepos(){
    try{
        // Fetch data from GitHub API
        const response = await fetch(githubAPI)
        const repos = await response.json()
        const reposList = document.getElementById('repos') // Element where repos will display
        
        reposList.innerHTML = '' // Clear existing list
        
        // Loop through each repo and create elements to display them
        repos.forEach(repo => {
            // Variables for ease of access
            const li = document.createElement('li')
            const link = document.createElement('a')
            // const lastUpdate = new Date(repo.updated_at).toLocaleDateString()
            const repoInfo = document.createElement('article')

            // Modify and update the repo timestamps
            const lastDate = new Date(repo.updated_at)
            const lastUpdate = lastDate.toLocaleString('en-US', { timeZone: 'UTC'})
            console.log(lastUpdate)
            console.log(repo.updated_at)

            link.href = repo.html_url // Set the link
            link.target = '_blank' // Open link to new tab
            link.textContent = repo.name // Set the repo name
            repoInfo.appendChild(link)
            
            // Check if repos have descriptions
            if (repo.description){
                const description = document.createElement('p')
                // Shorten descriptions if too long
                const trimmedDesc = repo.description.length > 100 ? repo.description.slice(0,100) + '....' : repo.description
                
                // Set the content and append
                description.textContent = trimmedDesc
                repoInfo.appendChild(description)
            }
            
            // Add repo's last update
            repoInfo.innerHTML += `<span>Last Update: ${lastUpdate}</span>`
            li.appendChild(repoInfo)
            reposList.appendChild(li)
        })
    } catch (error){
        // Handle errors if fetch fails
        console.error('Error fetching repositories:', error)
    }
}

fetchRepos()