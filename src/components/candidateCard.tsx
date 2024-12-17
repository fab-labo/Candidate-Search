interface candidateCardProps {
    avatar: string;
    name: string;
    username: string;
    location: string;
    email: string;
    html_url: string;
    company: string;
    bio: string;
}

const candidateCard = ({ avatar, name, username, location, email, html_url, company, bio }: candidateCardProps) => 
    <section>
        <figure> 
            <a href={html_url} target="_blank" rel="noopener noreferrer">
                <img src={avatar} alt={name} />
            </a>
        </figure>
        <article>
            <h2>{name} {username}</h2>
            <p>Location: {location == null ? 'Not Available' : location}</p>
            <p>Email: {email == null ? 'Not Available' : email}</p>
            <p>Company: {company == null ? 'Not Available' : company}</p>
            <p>Bio: {bio == null ? 'Not Available' : bio}</p>
        </article>
    </section>

export default candidateCard;
    