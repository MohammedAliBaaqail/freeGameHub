import "./Search.scss";

export const Search = ({handleSearch}) => {
  return (
    
      <div className="form-wrapper">
        <input type="text" id="search" placeholder="Search" required onChange={handleSearch} />
        
    
    </div>
  );
};
