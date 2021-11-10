import React, { useEffect, useState } from "react"
import styled from 'styled-components'

const Wrapper = styled.main`
  width: 100%;
  min-height: 100%; 
  text-align: center;
  padding-top: 10%
  `

const FormCreate = styled.form`

`

const InputFormCreate = styled.input`
  width: 40%;
  height: 20px;
  border: 1px solid gray;
  border-radius: 7px;
  padding: 15px 20px;
  outline: none;
  text-overflow: ellipsis;
`

const FormSearch = styled.form`
  padding-top: 30px;
  margin-bottom: 30px;
`

const InputFormSearch = styled.input`
  width: 15%;
  height: 20px;
  border: 1px solid gray;
  border-radius: 5px;  
  padding: 15px 20px;
  outline: none;
`

const Button = styled.button`
  background-color: gray;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
  padding: 7px 22px;
  border: none;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 4%;
`

const ListNotes = styled.ul`
`
const BlockItemListNotes = styled.div`
  padding: 20px 0;
`
const ItemListNotes = styled.li`
  font-size: 26px;
  list-style-type: none;
`
const ButtonDeleteListNotes = styled.button`
  background-color: gray;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
  padding: 7px 22px;
  border: none;
`

const ButtonChangeListNotes = styled.button`
  background-color: red;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
  padding: 7px 22px;
  border: none;
`

const ListTag = styled.ul`
  padding: 0 12%;
  margin-left: 5%;
`
const BlockItemListTag = styled.div`
  padding: 20px 0;
`
const ItemListTag = styled.li`
  font-size: 26px;
  list-style-type: none;
`
const ButtonDeleteListTag = styled.button`
  background-color: red;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
  padding: 7px 22px;
  border: none;
`



export const Notes = () => {
  const [value, setValue] = useState("")
  const [tag, setTag] = useState("")
  const [data, setData] = useState([])
  const [noteTag, setNoteTag] = useState([])
  const [temporaryNoteTag, setTemporaryNoteTag] = useState([])
  const [json, setJson] = useState(null)


  useEffect(() => {
    let val = value.split(/(#[a-z\d-]+)/ig)
    for (let i = 0; i < val.length; i++) {
      if (val[i].charAt(0) === "#") {
        const array = []
        array.push(val[i])
        setTemporaryNoteTag(array)
      }
    }
  }, [value])


  const onValueChange = (e) => {
    setValue(e.target.value)
  }

  const onNoteSubmit = (e) => {
    e.preventDefault()

    const jsonData = {
      data,
      noteTag
    }

    setData([...data, value])
    setNoteTag([...noteTag, ...temporaryNoteTag])
    setJson(JSON.stringify(jsonData))
  }

  const onNoteTagChange = (e) => {
    setTag(e.target.value)
  }

  const onTagSearch = (e) => {
    e.preventDefault()
    const dataCopy = [...data]
    let indexNoteFindTag = dataCopy.findIndex(i => i.indexOf(tag) !== -1)
    dataCopy.unshift(data[indexNoteFindTag])
    dataCopy.splice(indexNoteFindTag + 1, 1)
    setData(dataCopy)
  }

  const onNoteEdit = (item, index) => {
    data.splice(index, 1, value)
    setValue(item)
  }

  const onNoteDelete = (item, index) => {
    data.splice(index, 1)
    setValue(item)
  };

  const onTagDelete = (index) => {
    noteTag.splice(index, 1)
    setNoteTag([...noteTag])
  }



  return (
    <Wrapper>
      <FormCreate>
        <InputFormCreate
          onChange={onValueChange}
          value={value}
          placeholder="Enter the text" />
        <Button onClick={onNoteSubmit}>Add</Button>
      </FormCreate>

      <FormSearch>
        <InputFormSearch
          onChange={onNoteTagChange}
          value={tag}
          placeholder="Search by tag" />
        <Button onClick={onTagSearch}>Search</Button>
      </FormSearch>
      <Flex>
        <ListNotes>
          {data.length > 0 && data.map((item, index) =>
            <BlockItemListNotes key={index}>
              <ItemListNotes>{item}</ItemListNotes>
              <ButtonDeleteListNotes onClick={() => onNoteEdit(item, index)}>Edit</ButtonDeleteListNotes>
              <ButtonChangeListNotes onClick={() => onNoteDelete(item, index)}>Delete</ButtonChangeListNotes>
            </BlockItemListNotes>
          )}
        </ListNotes>

        <ListTag>
          {noteTag.length > 0 && noteTag.map((item, index) =>
            <BlockItemListTag key={index}>
              <ItemListTag>{item}</ItemListTag>
              <ButtonDeleteListTag onClick={() => onTagDelete(index)}>Delete</ButtonDeleteListTag>
            </BlockItemListTag>
          )}
        </ListTag>
      </Flex>

    </Wrapper>
  )
}
