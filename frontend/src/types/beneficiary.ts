export type BeneficiaryType = 'District' | 'Public' | 'Institute' | 'Panchayat';

export interface DistrictList {
    status: string;
    length: number;
    data: District[];
}

export interface District {
    id:string;
    districtId: string;
    name: string;
    year: number;
    funds_total: number;
    funds_utilised: number;
    funds_balance: number;
    percent_utilised: number;
    percent_balance: number;
}

export interface CategoryList {
    status: string;
    length: number;
    data: Category[];
}

export interface Category {
    _id: string;
    categoryName: string;
}

export interface ArticleList {
    status: string;
    length: number;
    data: Article[];
}

export interface Article {
    id: string;
    articleName: string;
    categoryName: string;
    categoryId: string;
    unitCost: number;
}

export interface BeneficiaryRecord {
    status: string,
    length: number,
    data: BeneficiaryListParams[]
}

export interface FormData {
    type: BeneficiaryType;
    districtId?: string;
    categoryId: string;
    articleId: string;
    beneficiaryId?: string;
    beneficiaryName?: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
}

export interface BeneficiaryListParams {
    id: string;
    beneficiaryType: BeneficiaryType;
    beneficiaryTypeId:string;
    yearId: string;
    year: number
    articleId:string;
    article: string;
    categoryId: string;
    category: string;
    beneficiary: string;
    beneficiaryId: string;
    beneficiaryName: string;
    code: number;
    prefix: string;
    uniqueId: string;
    districtId: string;
    district: string;
    quantity: number;
    unitCost: number;
    totalCost: number;
    createdBy: string;
  }