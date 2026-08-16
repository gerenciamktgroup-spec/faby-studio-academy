export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activity_events: {
        Row: {
          course_id: string | null
          duration_seconds: number | null
          event_type: string
          id: string
          ip_hash: string
          lesson_id: string | null
          metadata_json: Json | null
          module_id: string | null
          occurred_at: string
          received_at: string
          schema_version: number | null
          session_id: string
          source: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          course_id?: string | null
          duration_seconds?: number | null
          event_type: string
          id?: string
          ip_hash: string
          lesson_id?: string | null
          metadata_json?: Json | null
          module_id?: string | null
          occurred_at?: string
          received_at?: string
          schema_version?: number | null
          session_id: string
          source?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          course_id?: string | null
          duration_seconds?: number | null
          event_type?: string
          id?: string
          ip_hash?: string
          lesson_id?: string | null
          metadata_json?: Json | null
          module_id?: string | null
          occurred_at?: string
          received_at?: string
          schema_version?: number | null
          session_id?: string
          source?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_events_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_events_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_events_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_practice_reviews: {
        Row: {
          detected_adhesive_score: number | null
          detected_spacing_score: number | null
          detected_symmetry_score: number | null
          id: string
          is_official_grade: boolean
          model_name: string
          reviewed_at: string | null
          reviewed_by_teacher_id: string | null
          student_id: string
          submission_id: string
          teacher_override_grade: number | null
          teacher_override_notes: string | null
          vision_analysis_json: Json
        }
        Insert: {
          detected_adhesive_score?: number | null
          detected_spacing_score?: number | null
          detected_symmetry_score?: number | null
          id?: string
          is_official_grade?: boolean
          model_name?: string
          reviewed_at?: string | null
          reviewed_by_teacher_id?: string | null
          student_id: string
          submission_id: string
          teacher_override_grade?: number | null
          teacher_override_notes?: string | null
          vision_analysis_json?: Json
        }
        Update: {
          detected_adhesive_score?: number | null
          detected_spacing_score?: number | null
          detected_symmetry_score?: number | null
          id?: string
          is_official_grade?: boolean
          model_name?: string
          reviewed_at?: string | null
          reviewed_by_teacher_id?: string | null
          student_id?: string
          submission_id?: string
          teacher_override_grade?: number | null
          teacher_override_notes?: string | null
          vision_analysis_json?: Json
        }
        Relationships: [
          {
            foreignKeyName: "ai_practice_reviews_reviewed_by_teacher_id_fkey"
            columns: ["reviewed_by_teacher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_practice_reviews_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_practice_reviews_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "assignment_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_study_plans: {
        Row: {
          course_id: string
          created_at: string | null
          days_until_exam: number
          generated_schedule_json: Json
          id: string
          is_completed: boolean
          student_id: string
          target_exam_date: string | null
          weak_skills_json: Json
        }
        Insert: {
          course_id: string
          created_at?: string | null
          days_until_exam: number
          generated_schedule_json?: Json
          id?: string
          is_completed?: boolean
          student_id: string
          target_exam_date?: string | null
          weak_skills_json?: Json
        }
        Update: {
          course_id?: string
          created_at?: string | null
          days_until_exam?: number
          generated_schedule_json?: Json
          id?: string
          is_completed?: boolean
          student_id?: string
          target_exam_date?: string | null
          weak_skills_json?: Json
        }
        Relationships: [
          {
            foreignKeyName: "ai_study_plans_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_study_plans_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_attempts: {
        Row: {
          answers_json: Json | null
          assessment_id: string
          id: string
          passed: boolean | null
          score: number | null
          started_at: string | null
          student_id: string
          submitted_at: string | null
        }
        Insert: {
          answers_json?: Json | null
          assessment_id: string
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string | null
          student_id: string
          submitted_at?: string | null
        }
        Update: {
          answers_json?: Json | null
          assessment_id?: string
          id?: string
          passed?: boolean | null
          score?: number | null
          started_at?: string | null
          student_id?: string
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_attempts_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assessments: {
        Row: {
          created_at: string | null
          id: string
          lesson_id: string
          passing_score: number | null
          time_limit_minutes: number | null
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          lesson_id: string
          passing_score?: number | null
          time_limit_minutes?: number | null
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lesson_id?: string
          passing_score?: number | null
          time_limit_minutes?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      assignment_submissions: {
        Row: {
          assignment_id: string
          feedback: string | null
          file_url: string | null
          grade: number | null
          graded_at: string | null
          graded_by: string | null
          id: string
          student_id: string
          submission_text: string | null
          submitted_at: string | null
        }
        Insert: {
          assignment_id: string
          feedback?: string | null
          file_url?: string | null
          grade?: number | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          student_id: string
          submission_text?: string | null
          submitted_at?: string | null
        }
        Update: {
          assignment_id?: string
          feedback?: string | null
          file_url?: string | null
          grade?: number | null
          graded_at?: string | null
          graded_by?: string | null
          id?: string
          student_id?: string
          submission_text?: string | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assignment_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_graded_by_fkey"
            columns: ["graded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignment_submissions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          created_at: string | null
          description: string
          due_date: string | null
          id: string
          lesson_id: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          due_date?: string | null
          id?: string
          lesson_id: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          due_date?: string | null
          id?: string
          lesson_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_exports: {
        Row: {
          export_format: Database["public"]["Enums"]["export_format"]
          file_hash: string
          file_location: string
          filters_json: Json | null
          generated_at: string | null
          id: string
          record_count: number | null
          requested_by: string
        }
        Insert: {
          export_format: Database["public"]["Enums"]["export_format"]
          file_hash: string
          file_location: string
          filters_json?: Json | null
          generated_at?: string | null
          id?: string
          record_count?: number | null
          requested_by: string
        }
        Update: {
          export_format?: Database["public"]["Enums"]["export_format"]
          file_hash?: string
          file_location?: string
          filters_json?: Json | null
          generated_at?: string | null
          id?: string
          record_count?: number | null
          requested_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_exports_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          code: string
          course_id: string
          enrollment_id: string
          hash_signature: string
          id: string
          issued_at: string | null
          student_id: string
          total_active_hours: number
          verification_url: string
        }
        Insert: {
          code: string
          course_id: string
          enrollment_id: string
          hash_signature: string
          id?: string
          issued_at?: string | null
          student_id: string
          total_active_hours?: number
          verification_url: string
        }
        Update: {
          code?: string
          course_id?: string
          enrollment_id?: string
          hash_signature?: string
          id?: string
          issued_at?: string | null
          student_id?: string
          total_active_hours?: number
          verification_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_enrollment_id_fkey"
            columns: ["enrollment_id"]
            isOneToOne: false
            referencedRelation: "enrollments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      consent_records: {
        Row: {
          consent_type: string
          granted_at: string | null
          id: string
          ip_hash: string
          user_id: string
          version: string
        }
        Insert: {
          consent_type: string
          granted_at?: string | null
          id?: string
          ip_hash: string
          user_id: string
          version: string
        }
        Update: {
          consent_type?: string
          granted_at?: string | null
          id?: string
          ip_hash?: string
          user_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "consent_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_knowledge_chunks: {
        Row: {
          chunk_title: string
          content_text: string
          course_id: string | null
          created_at: string | null
          id: string
          lesson_id: string | null
          module_id: string | null
          source_ref: string
          source_type: string
          tags: Json | null
        }
        Insert: {
          chunk_title: string
          content_text: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          module_id?: string | null
          source_ref: string
          source_type: string
          tags?: Json | null
        }
        Update: {
          chunk_title?: string
          content_text?: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          module_id?: string | null
          source_ref?: string
          source_type?: string
          tags?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "course_knowledge_chunks_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_knowledge_chunks_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_knowledge_chunks_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      course_skills: {
        Row: {
          course_id: string
          id: string
          skill_id: string
          weight: number
        }
        Insert: {
          course_id: string
          id?: string
          skill_id: string
          weight?: number
        }
        Update: {
          course_id?: string
          id?: string
          skill_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_skills_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      course_staff: {
        Row: {
          assigned_at: string
          course_id: string
          id: string
          is_active: boolean
          staff_role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string
          course_id: string
          id?: string
          is_active?: boolean
          staff_role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string
          course_id?: string
          id?: string
          is_active?: boolean
          staff_role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_staff_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_staff_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_versions: {
        Row: {
          changelog_notes: string
          course_id: string
          created_at: string | null
          created_by: string
          id: string
          is_active: boolean
          version_tag: string
        }
        Insert: {
          changelog_notes: string
          course_id: string
          created_at?: string | null
          created_by: string
          id?: string
          is_active?: boolean
          version_tag: string
        }
        Update: {
          changelog_notes?: string
          course_id?: string
          created_at?: string | null
          created_by?: string
          id?: string
          is_active?: boolean
          version_tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_versions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_versions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string
          created_at: string | null
          description: string
          estimated_hours: number
          id: string
          image_url: string | null
          is_published: boolean | null
          level: string | null
          min_active_hours_pct: number
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          description: string
          estimated_hours?: number
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          level?: string | null
          min_active_hours_pct?: number
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          estimated_hours?: number
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          level?: string | null
          min_active_hours_pct?: number
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      data_deletion_requests: {
        Row: {
          completed_at: string | null
          id: string
          note: string | null
          requested_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          note?: string | null
          requested_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          note?: string | null
          requested_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_deletion_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      data_retention_policies: {
        Row: {
          category: string
          description: string
          id: string
          retention_period_days: number
        }
        Insert: {
          category: string
          description: string
          id?: string
          retention_period_days: number
        }
        Update: {
          category?: string
          description?: string
          id?: string
          retention_period_days?: number
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          certificate_id: string | null
          completed_at: string | null
          course_id: string
          enrolled_at: string | null
          id: string
          status: Database["public"]["Enums"]["enrollment_status"] | null
          student_id: string
        }
        Insert: {
          certificate_id?: string | null
          completed_at?: string | null
          course_id: string
          enrolled_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          student_id: string
        }
        Update: {
          certificate_id?: string | null
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["enrollment_status"] | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          forum_id: string
          id: string
          parent_id: string | null
          title: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          forum_id: string
          id?: string
          parent_id?: string | null
          title?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          forum_id?: string
          id?: string
          parent_id?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_posts_forum_id_fkey"
            columns: ["forum_id"]
            isOneToOne: false
            referencedRelation: "forums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_posts_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      forums: {
        Row: {
          course_id: string
          created_at: string | null
          description: string | null
          id: string
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "forums_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          active_time_seconds: number | null
          completed_at: string | null
          id: string
          lesson_id: string
          status: Database["public"]["Enums"]["progress_status"] | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          active_time_seconds?: number | null
          completed_at?: string | null
          id?: string
          lesson_id: string
          status?: Database["public"]["Enums"]["progress_status"] | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          active_time_seconds?: number | null
          completed_at?: string | null
          id?: string
          lesson_id?: string
          status?: Database["public"]["Enums"]["progress_status"] | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_skills: {
        Row: {
          id: string
          lesson_id: string
          points_granted: number
          skill_id: string
        }
        Insert: {
          id?: string
          lesson_id: string
          points_granted?: number
          skill_id: string
        }
        Update: {
          id?: string
          lesson_id?: string
          points_granted?: number
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_skills_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          body_text: string | null
          content_type: string
          content_url: string | null
          created_at: string | null
          duration_seconds: number
          id: string
          module_id: string
          order_index: number
          title: string
        }
        Insert: {
          body_text?: string | null
          content_type: string
          content_url?: string | null
          created_at?: string | null
          duration_seconds?: number
          id?: string
          module_id: string
          order_index?: number
          title: string
        }
        Update: {
          body_text?: string | null
          content_type?: string
          content_url?: string | null
          created_at?: string | null
          duration_seconds?: number
          id?: string
          module_id?: string
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          id: string
          is_read: boolean | null
          recipient_id: string
          sender_id: string
          sent_at: string | null
        }
        Insert: {
          content: string
          id?: string
          is_read?: boolean | null
          recipient_id: string
          sender_id: string
          sent_at?: string | null
        }
        Update: {
          content?: string
          id?: string
          is_read?: boolean | null
          recipient_id?: string
          sender_id?: string
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          course_id: string
          created_at: string | null
          description: string | null
          id: string
          order_index: number
          title: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          order_index?: number
          title: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          order_index?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean
          link_url: string | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean
          link_url?: string | null
          message: string
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean
          link_url?: string | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      privacy_policy_versions: {
        Row: {
          content: string
          effective_date: string | null
          id: string
          version: string
        }
        Insert: {
          content: string
          effective_date?: string | null
          id?: string
          version: string
        }
        Update: {
          content?: string
          effective_date?: string | null
          id?: string
          version?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          dni_nie: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          dni_nie?: string | null
          email: string
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          dni_nie?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          assessment_id: string
          correct_answer_json: Json
          id: string
          options_json: Json
          points: number | null
          question_text: string
          question_type: string | null
        }
        Insert: {
          assessment_id: string
          correct_answer_json?: Json
          id?: string
          options_json?: Json
          points?: number | null
          question_text: string
          question_type?: string | null
        }
        Update: {
          assessment_id?: string
          correct_answer_json?: Json
          id?: string
          options_json?: Json
          points?: number | null
          question_text?: string
          question_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      session_logs: {
        Row: {
          course_id: string | null
          ended_at: string | null
          id: string
          is_active: boolean | null
          last_heartbeat_at: string | null
          session_id: string
          started_at: string | null
          total_active_seconds: number | null
          total_logged_seconds: number | null
          user_id: string
        }
        Insert: {
          course_id?: string | null
          ended_at?: string | null
          id?: string
          is_active?: boolean | null
          last_heartbeat_at?: string | null
          session_id: string
          started_at?: string | null
          total_active_seconds?: number | null
          total_logged_seconds?: number | null
          user_id: string
        }
        Update: {
          course_id?: string | null
          ended_at?: string | null
          id?: string
          is_active?: boolean | null
          last_heartbeat_at?: string | null
          session_id?: string
          started_at?: string | null
          total_active_seconds?: number | null
          total_logged_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "session_logs_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_evidence: {
        Row: {
          created_at: string | null
          evidence_type: string
          feedback_notes: string | null
          id: string
          max_score: number
          reference_id: string
          score_obtained: number
          student_skill_id: string
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          evidence_type: string
          feedback_notes?: string | null
          id?: string
          max_score?: number
          reference_id: string
          score_obtained?: number
          student_skill_id: string
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          evidence_type?: string
          feedback_notes?: string | null
          id?: string
          max_score?: number
          reference_id?: string
          score_obtained?: number
          student_skill_id?: string
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_evidence_student_skill_id_fkey"
            columns: ["student_skill_id"]
            isOneToOne: false
            referencedRelation: "student_skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skill_evidence_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: Database["public"]["Enums"]["skill_category"]
          created_at: string | null
          description: string
          icon: string | null
          id: string
          level: Database["public"]["Enums"]["skill_level"]
          name: string
          required_points: number
          slug: string
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          description: string
          icon?: string | null
          id?: string
          level?: Database["public"]["Enums"]["skill_level"]
          name: string
          required_points?: number
          slug: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          description?: string
          icon?: string | null
          id?: string
          level?: Database["public"]["Enums"]["skill_level"]
          name?: string
          required_points?: number
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      student_skills: {
        Row: {
          confidence_level: Database["public"]["Enums"]["evidence_confidence"]
          id: string
          is_verified: boolean
          proficiency_score: number
          skill_id: string
          student_id: string
          updated_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          confidence_level?: Database["public"]["Enums"]["evidence_confidence"]
          id?: string
          is_verified?: boolean
          proficiency_score?: number
          skill_id: string
          student_id: string
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          confidence_level?: Database["public"]["Enums"]["evidence_confidence"]
          id?: string
          is_verified?: boolean
          proficiency_score?: number
          skill_id?: string
          student_id?: string
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_skills_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_skills_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tutoring_sessions: {
        Row: {
          created_at: string | null
          duration_minutes: number | null
          id: string
          meeting_link: string | null
          notes: string | null
          scheduled_at: string
          status: string | null
          student_id: string
          tutor_id: string
        }
        Insert: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_at: string
          status?: string | null
          student_id: string
          tutor_id: string
        }
        Update: {
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          meeting_link?: string | null
          notes?: string | null
          scheduled_at?: string
          status?: string | null
          student_id?: string
          tutor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutoring_sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutoring_sessions_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_course: {
        Args: { target_course_id: string }
        Returns: boolean
      }
      can_manage_course: {
        Args: { target_course_id: string }
        Returns: boolean
      }
      can_manage_student: {
        Args: { target_student_id: string }
        Returns: boolean
      }
      can_message_user: { Args: { target_user_id: string }; Returns: boolean }
      can_view_student: {
        Args: { target_student_id: string }
        Returns: boolean
      }
      get_forum_feed: {
        Args: { p_forum_id: string }
        Returns: {
          author_id: string
          author_name: string
          content: string
          created_at: string
          id: string
          parent_id: string
          title: string
        }[]
      }
      has_any_role: {
        Args: { required_roles: Database["public"]["Enums"]["app_role"][] }
        Returns: boolean
      }
      has_role: {
        Args: {
          required_role: Database["public"]["Enums"]["app_role"]
          target_user_id: string
        }
        Returns: boolean
      }
      is_auditor_or_admin: { Args: { user_id: string }; Returns: boolean }
      submit_assessment_attempt: {
        Args: { p_answers: Json; p_assessment_id: string }
        Returns: {
          attempt_id: string
          passed: boolean
          score: number
        }[]
      }
    }
    Enums: {
      app_role:
        | "alumna"
        | "tutor"
        | "profesor"
        | "admin_academico"
        | "superadmin"
        | "auditor"
      enrollment_status: "active" | "completed" | "cancelled"
      evidence_confidence: "low" | "medium" | "high" | "expert"
      export_format: "csv" | "xlsx" | "pdf" | "json"
      progress_status: "not_started" | "in_progress" | "completed"
      retention_risk_level: "low" | "medium" | "high"
      skill_category:
        | "unas"
        | "pestanas"
        | "cosmetologia"
        | "bioseguridad"
        | "negocio"
      skill_level: "fundamentos" | "intermedio" | "avanzado" | "master"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_role: [
        "alumna",
        "tutor",
        "profesor",
        "admin_academico",
        "superadmin",
        "auditor",
      ],
      enrollment_status: ["active", "completed", "cancelled"],
      evidence_confidence: ["low", "medium", "high", "expert"],
      export_format: ["csv", "xlsx", "pdf", "json"],
      progress_status: ["not_started", "in_progress", "completed"],
      retention_risk_level: ["low", "medium", "high"],
      skill_category: [
        "unas",
        "pestanas",
        "cosmetologia",
        "bioseguridad",
        "negocio",
      ],
      skill_level: ["fundamentos", "intermedio", "avanzado", "master"],
    },
  },
} as const
