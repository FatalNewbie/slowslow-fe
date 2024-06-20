import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import CampingImage from '../assets/campingicon.png'; // 이미지 파일 가져오기

const Footer = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: '#586555', color: 'white', pt: 3, px: 2, pb: 2 }}>
            <Stack direction="column" alignItems="center">
                <Stack direction="row" spacing={1} mt={2} mb={4} alignItems="center">
                    <img src={CampingImage} alt="캠핑" style={{ width: '50px', height: '50px', marginTop: '-10px' }} />
                    <Typography variant="h5" fontWeight="bold" letterSpacing={3}>
                        늘짝늘짝
                    </Typography>
                </Stack>
                <Box width="80%">
                    <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', mb: 2 }} />
                </Box>
                <Stack direction="row" spacing={4} mt={3} mb={1}>
                    <Typography variant="body2">박원정</Typography>
                    <Typography variant="body2">고의성</Typography>
                    <Typography variant="body2">김경래</Typography>
                    <Typography variant="body2">김연지</Typography>
                    <Typography variant="body2">김이삭</Typography>
                    <Typography variant="body2">조한휘</Typography>
                </Stack>
                <Typography variant="body2" fontSize="x-small" mt={4} mb={4}>
                    늘짝늘짝 @ 2024. All rights reserved.
                </Typography>
            </Stack>
        </Box>
    );
};

export default Footer;
