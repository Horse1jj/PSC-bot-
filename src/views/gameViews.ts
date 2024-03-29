import {ActionRowBuilder} from "discord.js";
import {accept} from "../buttons/accept";
import {MessageActionRowComponentBuilder} from "discord.js";

export const acceptView = () => {
    // TODO: Add missing button
    return new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(accept.data).toJSON();
}

// Votex are the vote buttons found in the old repo
export const voteA1 = (label1: string, count1: number, label2: string, count2: number, label3: string, count3: number,
                       label4: string, count4: number, label5: string, count5: number, label6: string, count6: number,
                       label7: string, count7: number) => {
    const A = new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(vote1.data.setLabel(`${label1}: ${count1}`), vote2.data.setLabel(`${label2}: ${count2}`),
            vote3.data.setLabel(`${label3}: ${count3}`), vote4.data.setLabel(`${label4}: ${count4}`),
            vote5.data.setLabel(`${label5}: ${count5}`)).toJSON();
    const B = new ActionRowBuilder<MessageActionRowComponentBuilder>()
        .addComponents(vote6.data.setLabel(`${label6}: ${count6}`), vote7.data.setLabel(`${label7}: ${count7}`)).toJSON();
    return [A, B];
}