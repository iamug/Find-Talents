export interface ITalent {
  uuid: string;
  first_name: string;
  last_name: string;
  preffered_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  profile_picture: string;
  pronoun: string;
  preferred_job_title: string;
  professional_start_date: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
