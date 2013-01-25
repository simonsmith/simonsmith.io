<?php

class __blinkdesign_759b8cc322909b0572dfe71932dd4afd extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '', $escape = false)
    {
        $buffer = '';

        $buffer .= "\n";
        $buffer .= $indent . '    <article>';
        $buffer .= "\n";
        $buffer .= $indent . '        <header>';
        $buffer .= "\n";
        $buffer .= $indent . '            <h1 class="hdr hdr-page">';
        $value = $context->find('title');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= '</h1>';
        $buffer .= "\n";
        $buffer .= $indent . '            <time datetime="';
        $value = $context->find('w3c_date');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
        $buffer .= '">';
        $value = $context->find('date');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= htmlspecialchars($value, ENT_COMPAT, 'UTF-8');
        $buffer .= '</time>';
        $buffer .= "\n";
        $buffer .= $indent . '        </header>';
        $buffer .= "\n";
        $buffer .= $indent . '        <div class="post-content">';
        $buffer .= "\n";
        $buffer .= $indent . '            ';
        $value = $context->find('content');
        if (!is_string($value) && is_callable($value)) {
            $value = $this->mustache
                ->loadLambda((string) call_user_func($value))
                ->renderInternal($context, $indent);
        }
        $buffer .= $value;
        $buffer .= "\n";
        $buffer .= $indent . '        </div>';
        $buffer .= "\n";
        $buffer .= $indent . '        <footer class="post-footer">';
        $buffer .= "\n";
        $buffer .= $indent . '            <p>Fancy a comment? <a href="http://twitter.com/blinkdesign">Hit me up on twitter</a></p>';
        $buffer .= "\n";
        $buffer .= $indent . '        </footer>';
        $buffer .= "\n";
        $buffer .= $indent . '    </article>';
        $buffer .= "\n";

        if ($escape) {
            return htmlspecialchars($buffer, ENT_COMPAT, 'UTF-8');
        } else {
            return $buffer;
        }
    }

}