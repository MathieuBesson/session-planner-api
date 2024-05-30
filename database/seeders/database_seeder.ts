import Hall from "#models/hall"
import SessionType from "#models/session_type"
import { BaseSeeder } from "@adonisjs/lucid/seeders"
import { Roles } from "../../app/enums/roles.js"
import User from "#models/user"
import { faker } from '@faker-js/faker';
import Session from "#models/session"
import { DateTime } from "luxon"
import db from '@adonisjs/lucid/services/db'

export default class DatabaseSeeder extends BaseSeeder {

    /**
     * Nettoyage de la base de donnée
     */
    private async truncateDatabase() {
        const tables = [
            'session_user',
            'sessions',
            'halls',
            'session_types',
            'users',
        ]

        for (const table of tables) {
            await db.rawQuery(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`)
        }
    }

    /**
     * Lancemnt du seeder
     */
    public async run() {

        await this.truncateDatabase();

        // Session types
        await SessionType.createMany([
            { name: 'jeu libre' },
            { name: 'entrainement PR/R2' },
            { name: 'championnat' },
        ])

        // Halls
        await Hall.createMany([
            { name: 'Salle de la Seiche', maxCapacity: 48 },
            { name: 'Salle de la Chalotais', maxCapacity: 24 },
        ])

        // User
        const user = await User.create({
            externalId: faker.string.uuid(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            roleId: Roles.ADMIN
        })

        // Sessions
        const sessionTypes = await SessionType.all()
        const halls = await Hall.all()

        const now = DateTime.local();
        const nextTuesday = now.plus({ days: (7 + now.weekday - 2) % 7 });
        const nextSaturday = now.plus({ days: (7 + now.weekday - 4) % 7 });

        const sessionDataList = [
            {
                session: {
                    startTime: 72_000,
                    endTime: 82_800,
                    maxCapacity: 28,
                    note: 'Jeu libre (tous)',
                    date: nextTuesday,
                    cancelled: false,
                    delayBeforeRegistration: 7
                },
                relations: {
                    sessionType: sessionTypes[0],
                    hall: halls[0],
                }
            },
            {
                session: {
                    startTime: 72_000,
                    endTime: 82_800,
                    maxCapacity: 24,
                    note: 'Jeu libre (loisirs)',
                    date: nextTuesday,
                    cancelled: false,
                    delayBeforeRegistration: 7,
                },
                relations: {
                    sessionType: sessionTypes[0],
                    hall: halls[1],
                }
            },
            {
                session: {
                    startTime: 72_000,
                    endTime: 82_800,
                    maxCapacity: 20,
                    note: 'Entrainement PR/R2',
                    date: nextSaturday,
                    cancelled: false,
                    delayBeforeRegistration: 7,
                },
                relations: {
                    sessionType: sessionTypes[1],
                    hall: halls[0],
                }
            },
            {
                session: {
                    startTime: 72_000,
                    endTime: 82_800,
                    maxCapacity: 8,
                    note: 'Championnat',
                    date: nextTuesday,
                    cancelled: false,
                    delayBeforeRegistration: 0,
                },
                relations: {
                    sessionType: sessionTypes[2],
                    hall: halls[0],
                }
            },
        ]

        for (const sessionData of sessionDataList) {
            let session = await Session.create(sessionData.session);
            session.related("sessionType").associate(sessionData.relations.sessionType);
            session.related("hall").associate(sessionData.relations.hall);
            session.related("users").attach([user.id]);
            session.save();
        }
    }
}
