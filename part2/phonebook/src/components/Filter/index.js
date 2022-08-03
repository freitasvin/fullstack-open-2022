export const Filter = ({
  handleSearch
}) => {
  return(
    <div>
      filter shown with: <input onChange={handleSearch}/>
    </div>
  )
}
