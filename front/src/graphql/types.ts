export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Audit = {
  __typename?: 'Audit';
  ancienSalaire: Scalars['Float'];
  employe: Employe;
  id: Scalars['Int'];
  nouveauSalaire: Scalars['Float'];
  quoi: Scalars['String'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CreateCategoryInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CreateEmployeInput = {
  nom: Scalars['String'];
  salaire: Scalars['Int'];
  serviceId: Scalars['Int'];
};

export type CreateServiceInput = {
  intitule: Scalars['String'];
};

export type CreateSyntheseInput = {
  effectif: Scalars['Int'];
  intitule: Scalars['String'];
  nombreSalDef: Scalars['Int'];
  somSalaire: Scalars['Int'];
};

export type CreateUserInput = {
  name: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};


export type Employe = {
  __typename?: 'Employe';
  id: Scalars['Int'];
  nom: Scalars['String'];
  role: Scalars['Int'];
  salaire: Scalars['Int'];
  service: Service;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createEmploye: Employe;
  createService: Service;
  createSynthese: Synthese;
  createUser: User;
  removeAudit: Audit;
  removeCategory: Category;
  removeEmploye: Employe;
  removeService: Scalars['Boolean'];
  removeSynthese: Synthese;
  softRemoveUser: Scalars['Boolean'];
  updateCategory: Category;
  updateEmploye: Employe;
  updateService: Service;
  updateSynthese: Synthese;
  updateUser: User;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateEmployeArgs = {
  input: CreateEmployeInput;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationCreateSyntheseArgs = {
  input: CreateSyntheseInput;
};


export type MutationCreateUserArgs = {
  image?: Maybe<Scalars['Upload']>;
  input: CreateUserInput;
};


export type MutationRemoveAuditArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveEmployeArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveServiceArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveSyntheseArgs = {
  id: Scalars['Int'];
};


export type MutationSoftRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateEmployeArgs = {
  updateEmployeInput: UpdateEmployeInput;
};


export type MutationUpdateServiceArgs = {
  input: UpdateServiceInput;
};


export type MutationUpdateSyntheseArgs = {
  updateSyntheseInput: UpdateSyntheseInput;
};


export type MutationUpdateUserArgs = {
  image?: Maybe<Scalars['Upload']>;
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  audit: Audit;
  categories: Array<Category>;
  employees: Array<Employe>;
  findOneCategory: Category;
  getAll: Scalars['String'];
  service: Service;
  services: Array<Service>;
  syntheses: Array<Synthese>;
  users: Array<User>;
};


export type QueryAuditArgs = {
  id: Scalars['Int'];
};


export type QueryFindOneCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryServiceArgs = {
  id: Scalars['Int'];
};

export type Service = {
  __typename?: 'Service';
  employes: Array<Employe>;
  id: Scalars['Int'];
  intitule: Scalars['String'];
};

export type Synthese = {
  __typename?: 'Synthese';
  effectif: Scalars['Int'];
  id: Scalars['Int'];
  intitule: Scalars['String'];
  nombreSalDef: Scalars['Int'];
  somSalaire: Scalars['Int'];
};

export type UpdateCategoryInput = {
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
};

export type UpdateEmployeInput = {
  id: Scalars['Int'];
  nom?: Maybe<Scalars['String']>;
  salaire?: Maybe<Scalars['Int']>;
  serviceId?: Maybe<Scalars['Int']>;
};

export type UpdateServiceInput = {
  id: Scalars['Int'];
  intitule?: Maybe<Scalars['String']>;
};

export type UpdateSyntheseInput = {
  effectif?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  intitule?: Maybe<Scalars['String']>;
  nombreSalDef?: Maybe<Scalars['Int']>;
  somSalaire?: Maybe<Scalars['Int']>;
};

export type UpdateUserInput = {
  id: Scalars['Int'];
  name: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};
