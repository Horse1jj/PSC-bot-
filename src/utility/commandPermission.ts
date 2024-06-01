import {Interaction} from "discord.js";
import {Command, SubCommand} from "../interfaces/Command";
import {Button} from "../interfaces/Button";
import {StringSelectMenu} from "../interfaces/SelectMenu";
import {grammaticalList} from "./grammatical";
import {CommandPermission} from "../interfaces/Internal";
import {Modal} from "../interfaces/Modal";

export const commandPermission = async (interaction: Interaction, command: Command | SubCommand | Button | StringSelectMenu | Modal): Promise<CommandPermission> => {
    let valid = false;
    let limited = false;
    let channel = false;
    // Check if user is rate limited
    if (command.limiter) {
        if (command.limiter.take(interaction.user.id)) {
            limited = true;
        }
    }
    // Check if channel is allowed
    if (command.allowedChannels) {
        if (!command.allowedChannels.includes(interaction.channelId!)) {
            channel = true;
        }
    }
    // Check if user is allowed
    if (command.allowedUsers && !limited && !channel) {
        if (command.allowedUsers.includes(interaction.user.id)) {
            valid = true;
        }
    }
    // Check if role is allowed
    if (command.allowedRoles && !limited && !channel) {
        const member = await interaction.guild!.members.fetch(interaction.user.id);
        for (let role of command.allowedRoles) {
            if (member.roles.cache.has(role)) {
                valid = true;
                break;
            }
        }
    } else {
        valid = true;
    }
    return {valid: valid, limited: limited, channel: channel, guild: false};
}

export const getChannels = (channels: string[]) => {
    // Make list of allowed channels
    let channelsTagged: string[] = []
    for (let channel of channels) {
        channelsTagged.push(`<#${channel}>`);
    }
    return grammaticalList(channelsTagged);
}
