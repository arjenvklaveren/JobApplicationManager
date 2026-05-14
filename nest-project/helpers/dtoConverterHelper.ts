import { ApplicationDTO, AppointmentDTO, CompanyDTO, ContactPersonDTO, PositionDTO, TaskDTO } from "@jobapplicationmanager/shared";
import { Applicant, Application, Appointment, Company, ContactPerson, Position, Prisma, Task } from "generated/prisma/browser";

type CompanyWithRelations = Prisma.CompanyGetPayload<{
  include: { positions: true, contact: true };
}>;

export function mapCompanyToDTO(company: CompanyWithRelations): CompanyDTO {
    return {
        id: company.id,
        name: company.name,
        city: company.city,
        websiteUrl: company.websiteUrl,
        isAgency: company.isAgency,
        contactPerson: null,
        positions: company.positions.map(position => mapPositionToDTO(position, company)),
        notes: []
    };
}

export function mapPositionToDTO(position: Position, company: Company): PositionDTO {
    return {
        id: position.id,
        title: position.title,
        sourceUrl: position.sourceUrl,
        company: {
            id: company.id,
            name: company.name,
            city: company.city,
            websiteUrl: company.websiteUrl,
            isAgency: company.isAgency,
            contactPerson: null,
            positions: [],
            notes: []
        },
        application: null
    };
}

export function mapApplicationToDTO(application: Application, position: Position, applicant: Applicant): ApplicationDTO {
    return {
        id: application.id,
        applied_date: application.applied_date,
        position: {
            id: position.id,
            title: position.title,
            sourceUrl: position.sourceUrl,
            company: null,
            application: null,
        },
        applicant: {
            id: applicant.id,
            accountId: applicant.accountId,
            city: applicant.city,
            applications: [],
        } 
    }
}

export function mapTaskToDTO(task: Task): TaskDTO {
    return {
        id: task.id,
        name: task.name,
        description: task.description,
        stage: task.stage,
        index: task.index,
        deadline: task.deadline
    }
}

export function mapAppointmentToDTO(appointment: Appointment, company: Company | null): AppointmentDTO {
    return {
        id: appointment.id,
        location: appointment.location,
        time: appointment.time,
        company: company ? {
            id: company.id,
            name: company.name,
            city: company.city,
            websiteUrl: company.websiteUrl,
            isAgency: company.isAgency,
            contactPerson: null,
            positions: [],
            notes: []
        } : null,
    }
}

export function mapContactPersonToDTO(contactPerson: ContactPerson, company: Company): ContactPersonDTO {
    return {
        name: contactPerson.name,
        position: contactPerson.position,
        phone: contactPerson.phone,
        email: contactPerson.email,
        company: {
            id: company.id,
            name: company.name,
            city: company.city,
            websiteUrl: company.websiteUrl,
            isAgency: company.isAgency,
            contactPerson: null,
            positions: [],
            notes: []
        },
    }
}