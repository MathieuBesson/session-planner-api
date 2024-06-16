import Hall from "#models/hall"
import SessionType from "#models/session_type"
import { BaseSeeder } from "@adonisjs/lucid/seeders"
import { Roles } from "../../app/enums/roles.js"
import User from "#models/user"
import { faker } from '@faker-js/faker';
import Session from "#models/session"
import { DateTime } from "luxon"
import db from '@adonisjs/lucid/services/db'
import { SessionStatus } from "../../app/enums/session_status.js"

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

    private getRandomElements(arr: User[], count: number) {

        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.filter((_, index) => index < count);
    }

    /**
     * Lancemnt du seeder
     */
    public async run() {

        await this.truncateDatabase();

        // Session types
        await SessionType.createMany([
            { name: 'jeu libre' },
            { name: 'entrainement' },
            { name: 'championnat' },
        ])

        // Halls
        await Hall.createMany([
            { name: 'Salle de la Seiche', maxCapacity: 48 },
            { name: 'Salle de la Chalotais', maxCapacity: 24 },
        ])

        // Users
        const userList = await User.createMany(

            [
                {
                    externalId: faker.string.uuid(),
                    firstName: "Mathieu",
                    lastName: "Besson",
                    email: "mathieu.besson@session-planner.fr",
                    password: "motdepasse",
                    roleId: Roles.ADMIN
                },
                {
                    externalId: faker.string.uuid(),
                    firstName: "Louann",
                    lastName: "Petit",
                    email: "louann.petit@session-planner.fr",
                    password: "motdepasse",
                    roleId: Roles.MEMBER
                },
                {
                    externalId: faker.string.uuid(),
                    firstName: "Victor",
                    lastName: "Durand",
                    email: "victor.durant@session-planner.fr",
                    password: "motdepasse",
                    roleId: Roles.MEMBER
                },
                {
                    externalId: faker.string.uuid(),
                    firstName: "Julien",
                    lastName: "Moreau",
                    email: "julien.moreau@session-planner.fr",
                    password: "motdepasse",
                    roleId: Roles.MEMBER
                },
                {
                    externalId: faker.string.uuid(),
                    firstName: "Florent",
                    lastName: "Richard",
                    email: "florent.richard@session-planner.fr",
                    password: "motdepasse",
                    roleId: Roles.MEMBER
                }
            ]
        )

        // Sessions
        const sessionTypes = await SessionType.all()
        const halls = await Hall.all()

        const now = DateTime.local();
        const nextTuesday = DateTime.local().plus({ days: (7 + now.weekday - 2) % 7 });
        const nextSaturday = DateTime.local().plus({ days: (7 + now.weekday - 4) % 7 });

        const sessionDataList = [
            {
                session: {
                    startTime: 72_000,
                    endTime: 82_800,
                    maxCapacity: 28,
                    name: 'Jeu libre (tous)',
                    date: nextTuesday,
                    cancelled: false,
                    delayBeforeRegistration: 7
                },
                relations: {
                    sessionType: sessionTypes[2],
                    hall: halls[1],
                }
            },
            {
                session: {
                    startTime: 72_000,
                    endTime: 82_800,
                    maxCapacity: 24,
                    name: 'Jeu libre (loisirs)',
                    date: nextTuesday,
                    cancelled: false,
                    delayBeforeRegistration: 7,
                },
                relations: {
                    sessionType: sessionTypes[2],
                    hall: halls[0],
                }
            },
            {
                session: {
                    startTime: 72_000,
                    endTime: 82_800,
                    maxCapacity: 20,
                    name: 'Entrainement régional',
                    date: nextSaturday,
                    cancelled: false,
                    delayBeforeRegistration: 7,
                },
                relations: {
                    sessionType: sessionTypes[1],
                    hall: halls[1],
                }
            },
            {
                session: {
                    startTime: 72_000,
                    endTime: 82_800,
                    maxCapacity: 8,
                    name: 'Championnat',
                    date: nextTuesday,
                    cancelled: false,
                    delayBeforeRegistration: 0,
                },
                relations: {
                    sessionType: sessionTypes[0],
                    hall: halls[1],
                }
            },
        ]

        for (const sessionData of sessionDataList) {
            let session = await Session.create(sessionData.session);
            session.related("sessionType").associate(sessionData.relations.sessionType);
            session.related("hall").associate(sessionData.relations.hall);
            for (const user of this.getRandomElements(userList, 4)) {
                console.log(session.getStatus())
                if (session.getStatus() === SessionStatus.OPEN) {
                    session.related("users").attach([user.id]);
                }
            }
            session.save();
        }
    }
}
