import { Player } from '../../interfaces/player'

interface Props {
    leaders: Player[] | undefined
}

const LeaderBoard: React.FC<Props> = ({ leaders }) => {
    return (
        <table
            className="font-light"
            style={{ width: '100%', marginTop: '1rem' }}
        >
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {leaders?.map((player: Player, index: number) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="flex-1 justify-center items-center">
                            {player.name} {index === 0 ? '🥇' : ''}
                            {index === 1 ? '🥈' : ''}
                            {index === 2 ? '🥉' : ''}
                        </td>
                        <td>{player.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default LeaderBoard
