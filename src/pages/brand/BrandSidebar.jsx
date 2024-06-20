// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { List, ListItem, ListItemText, TextField } from '@mui/material';

// const BrandSidebar = () => {
//     const [brands, setBrands] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         fetch('http://localhost:8080/brand/all')
//             .then((response) => response.json())
//             .then((data) => setBrands(data))
//             .catch((error) => console.error('Error fetching data:', error));
//     }, []);

//     const filteredBrands = brands.filter((brand) => brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()));

//     return (
//         <div>
//             <TextField
//                 label="브랜드 검색"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <List>
//                 <ListItem button component={Link} to={`/brand`}>
//                     <ListItemText primary="전체 보기" />
//                 </ListItem>
//                 {filteredBrands.map((brand) => (
//                     <ListItem button key={brand.id} component={Link} to={`/brand/${brand.id}`}>
//                         <ListItemText primary={brand.brandName} />
//                     </ListItem>
//                 ))}
//             </List>
//         </div>
//     );
// };

// export default BrandSidebar;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, TextField } from '@mui/material';

const BrandSidebar = () => {
    const [brands, setBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null); // state 추가

    useEffect(() => {
        fetch('http://localhost:8080/brand/all')
            .then((response) => response.json())
            .then((data) => setBrands(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const filteredBrands = brands.filter((brand) => brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleListItemClick = (id) => {
        setSelectedItemId(id === selectedItemId ? null : id); // 클릭된 항목의 id를 state에 설정
    };

    return (
        <div>
            <TextField
                label="브랜드 검색"
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
                    to={`/brand`}
                    selected={selectedItemId === null}
                    onClick={() => handleListItemClick(null)}
                    sx={{
                        backgroundColor: selectedItemId === null ? '#586555 !important' : 'transparent',
                        color: selectedItemId === null ? '#fff' : 'inherit',
                        '&:hover': {
                            backgroundColor: selectedItemId === null ? '#6d7b77' : '#f0f0f0',
                        },
                    }}
                >
                    <ListItemText primary="전체 보기" />
                </ListItem>
                {filteredBrands.map((brand) => (
                    <ListItem
                        key={brand.id}
                        button
                        component={Link}
                        to={`/brand/${brand.id}`}
                        selected={brand.id === selectedItemId}
                        onClick={() => handleListItemClick(brand.id)}
                        sx={{
                            backgroundColor: brand.id === selectedItemId ? '#586555 !important' : 'transparent',
                            color: brand.id === selectedItemId ? '#fff' : 'inherit',
                            '&:hover': {
                                backgroundColor: brand.id === selectedItemId ? '#6d7b77' : '#f0f0f0',
                            },
                        }}
                    >
                        <ListItemText primary={brand.brandName} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default BrandSidebar;
