import characters from '../../../data/avatarCharacters.json'
import {TwitterFollowCard} from './TwitterFollowCard'

export function TwitterList(){
    const cardList = []
    characters.Characters.forEach((element,index)=>{
        cardList.push(<TwitterFollowCard initialIsFollowing ={(element.isFollowing == 'True')} {...element} key={element.name+index}/>)
    })
    return(
        <section className='App'>
           {cardList}
        </section>
    )
}
