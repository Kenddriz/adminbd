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

export type CreateEmployeInput = {
  nom: Scalars['String'];
  salaire: Scalars['Int'];
  serviceId: Scalars['Int'];
};

export type CreateServiceInput = {
  intitule: Scalars['String'];
};

export type CreateSyntheseInput = {
  /** Example field (placeholder) */
  exampleField: Scalars['Int'];
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
  createEmploye: Employe;
  createService: Service;
  createSynthese: Synthese;
  createUser: User;
  removeAudit: Audit;
  removeEmploye: Employe;
  removeService: Service;
  removeSynthese: Synthese;
  softRemoveUser: Scalars['Boolean'];
  updateEmploye: Employe;
  updateService: Service;
  updateSynthese: Synthese;
  updateUser: User;
};


export type MutationCreateEmployeArgs = {
  input: CreateEmployeInput;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationCreateSyntheseArgs = {
  createSyntheseInput: CreateSyntheseInput;
};


export type MutationCreateUserArgs = {
  image?: Maybe<Scalars['Upload']>;
  input: CreateUserInput;
};


export type MutationRemoveAuditArgs = {
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
  employe: Employe;
  getAll: Scalars['String'];
  service: Service;
  services: Array<Service>;
  synthese: Synthese;
  users: Array<User>;
};


export type QueryAuditArgs = {
  id: Scalars['Int'];
};


export type QueryEmployeArgs = {
  id: Scalars['Int'];
};


export type QueryServiceArgs = {
  id: Scalars['Int'];
};


export type QuerySyntheseArgs = {
  id: Scalars['Int'];
};

export type Service = {
  __typename?: 'Service';
  createdAt: Scalars['DateTime'];
  employes: Array<Employe>;
  id: Scalars['Int'];
  intitule: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Synthese = {
  __typename?: 'Synthese';
  effectif: Scalars['Int'];
  id: Scalars['Int'];
  intitule: Scalars['String'];
  nombreSalDef: Scalars['Int'];
  somSalaire: Scalars['Int'];
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
  /** Example field (placeholder) */
  exampleField?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
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
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};
