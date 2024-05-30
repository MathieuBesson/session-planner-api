export enum SessionStatus {
    OPEN = 1,
    CANCEL = 2,
    FINISH = 3,
    COMPLETE = 4,
    FUTURE = 5,
}

export const SessionStatusLabel: { [key in SessionStatus]: string } = {
    [SessionStatus.OPEN]: "Ouvert",
    [SessionStatus.CANCEL]: "Annulé",
    [SessionStatus.FINISH]: "Terminé",
    [SessionStatus.COMPLETE]: "Complet",
    [SessionStatus.FUTURE]: "À venir",
};