




const Form = ({ formData }) => {
    const [page, setPage] = useState(0);
    const [currentPageData, setCurrentPageData] = useState(formData[page]);
    const onSubmit = e => {
        e.preventDefault();
        // todo - send data somewhere
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>{currentPageData.label}</h2>
            {currentPageData.fields.map(field => {
                switch 
            })}
          <FormHelper
                   inputType={"text"}
                   identifier={"genre"}
                   labelText={"Game Genre:"}
                   newVal={listing.genre}
                   onChangeHandler={changeHandler}
                 />
                  <FormHelper
                   inputType={"text"}
                   identifier={"publisher"}
                   labelText={"Game Publisher"}
                   newVal={listing.publisher}
                   onChangeHandler={changeHandler}
                 />
                  <FormHelper
                   inputType={"date"}
                   identifier={"releaseDate"}
                   labelText={"Release Date:"}
                   newVal={listing.releaseDate}
                   onChangeHandler={changeHandler}
                 />
           <FormHelper
                   inputType={"text"}
                   identifier={"version"}
                   labelText={"Console Version:"}
                   newVal={listing.version}
                   onChangeHandler={changeHandler}
                 />
                  <FormHelper
                   inputType={"text"}
                   identifier={"company"}
                   labelText={"Company"}
                   newVal={listing.company}
                   onChangeHandler={changeHandler}
                 />
                  <FormHelper
                   inputType={"date"}
                   identifier={"releaseDate"}
                   labelText={"Release Date:"}
                   newVal={listing.releaseDate}
                   onChangeHandler={changeHandler}
                 />
                 <FormHelper
                   inputType={"text"}
                   identifier={"category"}
                   labelText={"Category:"}
                   newVal={listing.version}
                   onChangeHandler={changeHandler}
                 />
        </form>
    );
};
