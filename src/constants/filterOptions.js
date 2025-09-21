/**
 * Este arquivo centraliza todas as opções de filtros padrão usadas no aplicativo.
 */

// Filtros de Período / Data
export const TIME_RANGE_FILTERS = [
    { label: 'Esta semana', value: 'this_week' },
    { label: 'Este mês', value: 'this_month' },
    { label: 'Últimos 30 dias', value: 'last_30_days' },
    { label: 'Últimos 90 dias', value: 'last_90_days' },
    { label: 'Todo o período', value: 'all_time' },
];

// Filtros por Status da Atividade
export const ACTIVITY_STATUS_FILTERS = [
    { label: 'Todas as Atividades', value: 'all' },
    { label: 'Concluídas com Sucesso', value: 'success' },
    { label: 'Realizadas com Ajuda', value: 'with_help' },
    { label: 'Conquistas Notáveis', value: 'milestone' },
    { label: 'Pontos de Atenção', value: 'attention_point' },
];

// Filtros por Área de Habilidade
export const SKILL_AREA_FILTERS = [
    { label: 'Todas as Habilidades', value: 'all' },
    { label: 'Coordenação Motora', value: 'motor_skills' },
    { label: 'Comunicação e Linguagem', value: 'communication' },
    { label: 'Habilidades Sociais', value: 'social_skills' },
    { label: 'Habilidades Cognitivas', value: 'cognitive_skills' },
];

// Filtros por Origem do Registro
export const RECORD_SOURCE_FILTERS = [
    { label: 'Todas as Origens', value: 'all' },
    { label: 'Registros da Escola', value: 'school' },
    { label: 'Observações dos Pais', value: 'parent' },
];

// Filtros por Professor
export const TEACHER_FILTERS = [
    { label: 'Todos os Professores', value: 'all' },
    { label: 'Prof. Carlos', value: 'carlos' },
    { label: 'Profa. Ana', value: 'ana' },
];

// Filtros por Turma
export const CLASS_FILTERS = [
    { label: 'Todas as Turmas', value: 'all' },
    { label: 'Turma A', value: 'a' },
    { label: 'Turma B', value: 'b' },
];