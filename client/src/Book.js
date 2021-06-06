export default function Book(props) {
    return (
        <h3>{item.volumeInfo.title}</h3>
            <p>{item.volumeInfo.description || 'No description found.'}</p>
            <a href={item.volumeInfo.infoLink}>Google books page</a>
            <div id='saveButton'>
                {(() => {
                    if (!item.saved) { 
                        return (
                            <button onClick={() => {
                                let thisItem = item
                                let thisIndex = i
                                this.saveBook(thisItem, thisIndex)
                            }}>Save</button>
                        )
                    } else {
                        return (
                            <button className='disabled'>Saved ✓</button>
                        )
                    }
                })()}
            </div>
    )
}