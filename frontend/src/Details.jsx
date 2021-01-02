import './Details.css';
import rightArrow from './rightArrow.png'
import trashImage from './trash.png'
import react from 'react'

// Date reservation info
function RawInfo(){
    return (
    <div className='rawInfo'>
        <h4>{1}</h4>
        <input className='trash' type='image' onClick={deleteReservation} src={trashImage}  alt='left arrow'></input></div>
    )
}
//delete reservation
function deleteReservation(){
    // TODO
}


function Details(){
    const pictures = [rightArrow,rightArrow,rightArrow,rightArrow,rightArrow]
    const [iterator,setIterator] = react.useState(0)
    return(
        <div className='Details'>
            <div className='GeneralInfo'>
                <div className='NameAndAddress'>
                    <h2>Name</h2>
                    <h4>Address: </h4>
                </div>
                <h4>Avaliable/booking</h4>

                <div className='ImageList'>
                    <input className='leftArrow' type='image' onClick={decreaseIterator} src={rightArrow} alt='left arrow'></input>
                    {pictures.map((picture,i) => {
                        if(i >= iterator && i < iterator + 3) return (<input type='image' src={picture} className='imageFromList' alt='right arrow'></input>)
                        else return <></> 
                    })}
                    
                    <input className='rightArrow' type='image' onClick={increaseIterator} src={rightArrow} alt='right arrow'></input>
                </div> 
            </div>
            <h4>Bookings</h4>
            <div className='ListOfBookingTimes'>
                {[1,2,3,4,5].map((elem,i) => {
                    return RawInfo(elem,i)
                })}
            </div>
        </div>
    )
    //change iterator for images
    function increaseIterator(){
        setIterator((prevIterator) => {
            if(pictures.length - prevIterator <= 3){
                return prevIterator
            }else return prevIterator + 1
        })
    }
    //change iterator for images
    function decreaseIterator(){
        setIterator((prevIterator) => {
            if(prevIterator > 0){
                return prevIterator - 1
            }else return prevIterator
        })
    }
}


export default Details;