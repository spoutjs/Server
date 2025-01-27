<<<<<<< HEAD
import { SpoutServer, Command, Player } from "../SpoutAPI";
import { pluginList } from "../../../core/plugin/loader";

export const main = (server: SpoutServer<any>) =>{
    new Command({
        command:"ver",
        aliases:["version", "spoutver", "spoutversion"],
        description:"Spout version info",
        run: (player: Player) =>{
            player.sendMessage([
                "&7&l------------------------", 
                "&7Running Spout version "+server.version, 
                "&7", 
                "&7Created by: "+server.developers.join(", "), 
                "&7&l------------------------"
            ]);
        }
    })
    new Command({
        command:"pl",
        aliases:["plugins", "whatpluginsisthisserverusing?"],
        description: "Lists all loaded plugins",
        run: (player: Player) =>{
            let allcommands = pluginList.filter(i=>!i.internal);
            allcommands.push({
                internal:true,
                baseName: "Spout",
                config: {}
            })
            player.sendMessage([
                "&7&l------------------------",
                "&7Plugins ("+allcommands.length+"):",
                "&7",
                "&a"+allcommands.join(", "),
                "&7&l------------------------"
            ])
        }
    })
    new Command({
        command:"help",
        aliases:["?", "helpme", "plssendhelp"],
        description: "Get command help",
        run: (player: Player, args: string[]) =>{
            const commands = new Command().commands;

            if(!args[0] || !commands.has(args[0].toLowerCase()) || isNaN(parseInt(args[0]))){
                player.sendMessage([
                    "&7&l------------------------",
                    "&7Command: /"+commands.get(args[0].toLowerCase()).command,
                    "&7Use: /"+commands.get(args[0].toLowerCase()).example,
                    "&7Description: /"+commands.get(args[0].toLowerCase()).description,
                    "&7&l------------------------"
                ]);
            }else{
                player.sendMessage([
                    "&7&l------------------------",
                    "&7Commands: [?/?]",
                    "&7Coming soon™️, i cba to do it rn",
                    "&7&l------------------------"
                ]);
            }
        }   
    })
}   
=======
import { SpoutServer } from '../SpoutAPI';
import { TabComplete } from './events';
import { load } from "./commands";

export const main = (server: SpoutServer<any>) => {
	server.addEvent(TabComplete);
    load(server);
};
>>>>>>> 8953cf528ba8224cede1575015fbc45698e12c3a
