import apiClient from './base'; // base.js에서 instance로 받아온 것임. 즉, apiClient =instance
import { recursiveToCamel } from '@/lib/utils/object';

// 모든 매칭 목록을 가져오기
export const readMatching = async () => { 
    const response = await apiClient.get('/api/matching')

    return recursiveToCamel(response.data)
}

// 프로필에서 매칭 시도
export const createMatching = async (data) => { 
    const response = await apiClient.post('/api/matching', data)

    return recursiveToCamel(response.data)
}

// 매칭한 것에 대해서 status update
export const updateMatching = async (matchingId, data) => { 
    const response = await apiClient.post(`/api/matching/${matchingId}`, data)

    return recursiveToCamel(response.data)
}