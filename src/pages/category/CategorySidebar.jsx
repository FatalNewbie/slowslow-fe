// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { List, ListItem, ListItemText, TextField } from '@mui/material';

// const CategorySidebar = () => {
//     const [categories, setCategories] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         fetch('http://localhost:8080/category/all')
//             .then((response) => response.json())
//             .then((data) => setCategories(data))
//             .catch((error) => console.error('Error fetching data:', error));
//     }, []);

//     const filteredCategories = categories.filter((category) => category.categoryName.toLowerCase().includes(searchTerm.toLowerCase()));

//     return (
//         <div>
//             <TextField
//                 label="카테고리 검색"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <List>
//                 <ListItem button component={Link} to={`/category`}>
//                     <ListItemText primary="전체 보기" />
//                 </ListItem>
//                 {filteredCategories.map((category) => (
//                     <ListItem button key={category.id} component={Link} to={`/category/${category.id}`}>
//                         <ListItemText primary={category.categoryName} />
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     );
// };

// export default CategorySidebar;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, TextField } from '@mui/material';

const CategorySidebar = () => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // state 추가

    useEffect(() => {
        fetch('http://localhost:8080/category/all')
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const filteredCategories = categories.filter((category) => category.categoryName.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleListItemClick = (id) => {
        setSelectedCategoryId(id === selectedCategoryId ? null : id); // 클릭된 항목의 id를 state에 설정
    };

    return (
        <div>
            <TextField
                label="카테고리 검색"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <List>
                <ListItem
                    button
                    component={Link}
                    to={`/category`}
                    selected={selectedCategoryId === null}
                    onClick={() => handleListItemClick(null)}
                    sx={{
                        backgroundColor: selectedCategoryId === null ? '#586555 !important' : 'transparent',
                        color: selectedCategoryId === null ? '#fff' : 'inherit',
                        '&:hover': {
                            backgroundColor: selectedCategoryId === null ? '#6d7b77' : '#f0f0f0',
                        },
                    }}
                >
                    <ListItemText primary="전체 보기" />
                </ListItem>
                {filteredCategories.map((category) => (
                    <ListItem
                        key={category.id}
                        button
                        component={Link}
                        to={`/category/${category.id}`}
                        selected={category.id === selectedCategoryId}
                        onClick={() => handleListItemClick(category.id)}
                        sx={{
                            backgroundColor: category.id === selectedCategoryId ? '#586555 !important' : 'transparent',
                            color: category.id === selectedCategoryId ? '#fff' : 'inherit',
                            '&:hover': {
                                backgroundColor: category.id === selectedCategoryId ? '#6d7b77' : '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary={category.categoryName} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default CategorySidebar;
