<?php

class __blinkdesign_e1e377aa0103274ec8d8a7f210287a87 extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '', $escape = false)
    {
        $buffer = '';

        $buffer .= "\n";
        $buffer .= $indent . '    <section>';
        $buffer .= "\n";
        $buffer .= $indent . '        <h1>Projects</h1>';
        $buffer .= "\n";
        $buffer .= "\n";
        $buffer .= $indent . '        <div class="work">';
        $buffer .= "\n";
        // 'project_items' section
        $buffer .= $this->section6bc94d76b8d87eedf95aa7b196f8785b($context, $indent, $context->find('project_items'));
        $buffer .= $indent . '        </div>';
        $buffer .= "\n";
        $buffer .= $indent . '    </section>';
        $buffer .= "\n";

        if ($escape) {
            return htmlspecialchars($buffer, ENT_COMPAT, 'UTF-8');
        } else {
            return $buffer;
        }
    }

    private function section6bc94d76b8d87eedf95aa7b196f8785b(Mustache_Context $context, $indent, $value) {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '
                {{> excerpt}}
            ';
            $buffer .= $this->mustache
                ->loadLambda((string) call_user_func($value, $source))
                ->renderInternal($context, $indent);
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                if ($partial = $this->mustache->loadPartial('excerpt')) {
                    $buffer .= $partial->renderInternal($context, '                ');
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }
}