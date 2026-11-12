import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { PaginatedResponse, Association } from '../types';
import { associationsData } from '../data/associations';

interface FetchAssociationsParams {
  page?: number;
  limit?: number;
  state?: string;
  taluk?: string;
  district?: string;
  search?: string;
}

type LocalAssociationSeed = {
  name: string;
  nameEn?: string;
  state?: string;
  taluk: string;
  district: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

const buildFallbackResponse = (params: FetchAssociationsParams): PaginatedResponse<Association> => {
  const page = params.page || 1;
  const limit = params.limit || 20;
  const search = params.search?.trim().toLowerCase();

  const filteredAssociations = (associationsData as LocalAssociationSeed[])
    .filter((association) => !params.state || (association.state || 'Kerala') === params.state)
    .filter((association) => !params.district || association.district === params.district)
    .filter((association) => !params.taluk || association.taluk === params.taluk)
    .filter((association) => {
      if (!search) {
        return true;
      }

      return [association.name, association.nameEn, association.taluk, association.district, association.state || 'Kerala']
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(search));
    });

  const paginatedAssociations = filteredAssociations
    .slice((page - 1) * limit, page * limit)
    .map((association, index) => ({
      _id: `${page}-${index}-${association.name}`,
      name: association.name,
      nameEn: association.nameEn,
      state: association.state || 'Kerala',
      taluk: association.taluk,
      district: association.district,
      category: 'Resident Welfare Association',
      slug: slugify(association.nameEn || association.name),
      isActive: true,
    }));

  return {
    status: 'success',
    results: paginatedAssociations.length,
    data: {
      associations: paginatedAssociations,
      pagination: {
        page,
        limit,
        total: filteredAssociations.length,
        totalPages: Math.ceil(filteredAssociations.length / limit),
      },
    },
  };
};

const fetchAssociations = async (params: FetchAssociationsParams): Promise<PaginatedResponse<Association>> => {
  try {
    const { data } = await api.get('/associations', { params });
    return data;
  } catch {
    return buildFallbackResponse(params);
  }
};

export const useAssociations = (params: FetchAssociationsParams) => {
  return useQuery({
    queryKey: ['associations', params],
    queryFn: () => fetchAssociations(params),
    staleTime: 60 * 1000 * 5, // 5 minutes
  });
};
